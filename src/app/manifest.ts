import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'i-Help',
    short_name: 'i-Help',
    description: 'i-Help App',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: 'icons/favicon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
      },
      {
        src: 'icons/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'icons/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    // screenshots: [
    //   {
    //     src: '![](https://velog.velcdn.com/images/sasha1107/post/0e027a40-b258-444e-b5a3-5a5fc9ea2a91/image.PNG)',
    //     sizes: '1280x720',
    //     type: 'image/png',
    //   },
    // ],
  };
}
