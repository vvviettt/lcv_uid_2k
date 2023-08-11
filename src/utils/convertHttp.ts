export default function convertHttp(url: string) {
  if (url.startsWith('https')) {
    return url;
  }
  return url.replace('http', 'https');
}
