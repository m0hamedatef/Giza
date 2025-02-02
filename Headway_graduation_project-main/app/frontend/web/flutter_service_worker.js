'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "6cf1b62bebce68317381e8ed41049c9d",
"assets/AssetManifest.json": "806026afe4f13474a6d69bd3f414953b",
"assets/assets/images/47666820": "e4c24c65934c8c7b23668215a83439c2",
"assets/assets/images/a1.PNG": "c6c2b169babda5a848bc49535f99313c",
"assets/assets/images/a2.PNG": "69abae5d3c32045680c256ea82dc3162",
"assets/assets/images/a3.PNG": "41084dd01b43df13fef29d101066547e",
"assets/assets/images/a4.jpeg": "51de79a5b22d8acc2150d9bdcb19abc0",
"assets/assets/images/a5.jpeg": "1a86893a0fb33d718fed00c3d3b02705",
"assets/assets/images/a6.jpeg": "d8075bb4d83a754967a6aa789a4e834f",
"assets/assets/images/a7.jpeg": "31ce6a262543b94643cb9d93ec500feb",
"assets/assets/images/agile.png": "b0fad736984bc461de2064db536c3935",
"assets/assets/images/ahmed.jpg": "6c8a9d4abba2dbefbaf80c96e4cd3eed",
"assets/assets/images/ansible.png": "44aa0b6b5cd7956f6a49492f7a3d6f43",
"assets/assets/images/aws.png": "52e6899a2fe018087bea1dad6257d442",
"assets/assets/images/background.PNG": "78608b5f0ef3b8ad033a2edd188f46de",
"assets/assets/images/bebo.enc": "b87bc740ccaeb4368b36f9d6ec03705c",
"assets/assets/images/d0113c92": "51de79a5b22d8acc2150d9bdcb19abc0",
"assets/assets/images/dc6626ce": "51de79a5b22d8acc2150d9bdcb19abc0",
"assets/assets/images/dev.jpg": "4aae2ad89fc28d93917fd504fc23ebaa",
"assets/assets/images/docker.png": "21980deb5e2761432131a492d6efc4c6",
"assets/assets/images/docker1.png": "4644da8a4197610f70ede012fdd0954f",
"assets/assets/images/download.png": "7cb77f0e4b06d94ca976da36f6ee72b2",
"assets/assets/images/eb5d8e86": "cf1c6df4b80f1e76925a3fb808723414",
"assets/assets/images/IMG_0647.HEIC": "9cf2f27b6e417e418275fee3e0c007f4",
"assets/assets/images/jenkins.png": "a79d34d1f8a4556f111f21bd408dff4f",
"assets/assets/images/jenkins1.png": "cf1c6df4b80f1e76925a3fb808723414",
"assets/assets/images/jenkinss.jpg": "6ea90627ad5a9fa1fad7de5622a3ff12",
"assets/assets/images/linux.png": "609a662b246f189858b3e3207b3632d3",
"assets/assets/images/Linux1.jpg": "7c4d4023580e0b35317c48a6a8861869",
"assets/assets/images/login.jpeg": "427ac8ff1ab0ea9e8442e4cdbc93a1e4",
"assets/assets/images/logo.jpeg": "d698065c0924330a475db97b40eb503e",
"assets/assets/images/me.jpg": "e4c24c65934c8c7b23668215a83439c2",
"assets/assets/images/python.png": "661a24450b91c760235306f89ca2c737",
"assets/assets/images/python1.png": "6841951dd3623f17a3f6a880c3f4f0a0",
"assets/assets/images/pythons.jpg": "8f63b3ac299dae47a4125ab2af67fe58",
"assets/assets/images/refaay.jpg": "f240f6f1b5abc4041faa879d018ad137",
"assets/assets/images/sami.jpg": "6a0bef812b84f3d7f2aa20339acddd0f",
"assets/assets/images/team.png": "3a05d1a1b7339a816338c8dd7b456ba2",
"assets/assets/images/team1.png": "1a60e75a59dd004e0dd1758ab2dd38cc",
"assets/assets/images/tera.png": "6bf851e3d362caa7f76f67923bb40139",
"assets/assets/images/terraform.png": "5cc4a61588e892c2c90d37abe81a2d87",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "a453ba032a0ef76213e5899ce2c28c0b",
"assets/NOTICES": "8677fb83cf8c3becaaab039728971f0f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"favicon.png": "4aae2ad89fc28d93917fd504fc23ebaa",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "e106569f48916c43293e23bbcafe7835",
"/": "e106569f48916c43293e23bbcafe7835",
"main.dart.js": "9660c6053107eaa3f76fd3027f215c42",
"manifest.json": "ae9816bd70087e29f67ada44422323d9",
"version.json": "5b50909eedf4efbf1076306fc468a03c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
