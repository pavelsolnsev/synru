export default function checkAllowedReferer(host: string) {
  const allowedHosts = [
    'localhost:3000',
    'localhost:3333',
    '127.0.0.1:3000',
    '127.0.0.1:3333',
  ];

  return allowedHosts.includes(host);
}
