import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

addEventListener('fetch', (event) => {
  event.respondWith(handle(event))
})

async function handle(event) {
  try {
    return await getAssetFromKV(event)
  } catch (e) {
    try {
      return await getAssetFromKV(event, { mapRequestToAsset: (req) => new Request(new URL('/index.html', req.url).toString(), req) })
    } catch (e2) {
      return new Response('Not found', { status: 404 })
    }
  }
}
