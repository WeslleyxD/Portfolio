export default async function Login() {
  const res = await fetch('https://api.github.com/repos/weslleyxd/Django-Blog');
  // The return value is *not* serialized
  // You can use Date, Map, Set, etc.
  const data = await res.json();

  return data.url;
}