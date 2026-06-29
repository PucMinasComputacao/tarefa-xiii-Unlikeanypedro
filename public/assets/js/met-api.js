const MET_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1";
const MET_DEFAULT_QUERY = "painting";
const metObjectCache = new Map();

async function metFetch(path) {
  const response = await fetch(`${MET_API_URL}${path}`);
  if (!response.ok) throw new Error("Falha ao consultar a API do Metropolitan Museum.");
  return response.json();
}

function normalizeMetObject(object) {
  return {
    ...object,
    id: object.objectID,
    title: object.title || "Sem titulo",
    artist: object.artistDisplayName || "Artista desconhecido",
    year: object.objectDate || "Sem data",
    category: object.department || "Sem departamento",
    thumbnail: object.primaryImageSmall || object.primaryImage,
    image: object.primaryImage || object.primaryImageSmall,
    description: object.creditLine || object.repository || object.medium || "Obra do acervo do Metropolitan Museum of Art.",
    tags: [object.department, object.culture, object.country].filter(Boolean)
  };
}

function isRenderableMetObject(object) {
  return Boolean(object && object.objectID && object.title && object.artistDisplayName && (object.primaryImage || object.primaryImageSmall));
}

async function getMetObject(objectID) {
  const id = Number(objectID);
  if (metObjectCache.has(id)) return metObjectCache.get(id);

  const object = await metFetch(`/objects/${id}`);
  const normalized = normalizeMetObject(object);
  metObjectCache.set(id, normalized);
  return normalized;
}

async function getMetObjectsByIds(ids, limit = 30) {
  const uniqueIds = [...new Set(ids)].slice(0, limit * 3);
  const results = await Promise.allSettled(uniqueIds.map(id => getMetObject(id)));
  return results
    .filter(result => result.status === "fulfilled" && isRenderableMetObject(result.value))
    .map(result => result.value)
    .slice(0, limit);
}

async function searchMetObjects(query = MET_DEFAULT_QUERY, limit = 30, options = {}) {
  const params = new URLSearchParams({
    q: query || MET_DEFAULT_QUERY,
    hasImages: "true"
  });

  if (options.isHighlight) params.set("isHighlight", "true");

  const data = await metFetch(`/search?${params.toString()}`);
  const ids = data.objectIDs || [];
  return getMetObjectsByIds(ids, limit);
}

async function getMetHighlights(query = MET_DEFAULT_QUERY, limit = 6) {
  const highlights = await searchMetObjects(query, limit, { isHighlight: true });
  if (highlights.length) return highlights;
  return searchMetObjects(query, limit);
}
