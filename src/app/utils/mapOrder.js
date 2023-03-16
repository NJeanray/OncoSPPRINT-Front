export default function mapOrder(a, order, key) {
  // eslint-disable-next-line
  const map = order.reduce((r, v, i) => ((r[v] = i), r), {})

  return a.sort((a, b) => map[a[key]] - map[b[key]])
}
