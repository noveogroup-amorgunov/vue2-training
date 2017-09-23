export function host(url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const parts = host.split('.').slice(-3);
  if (parts[0] === 'www') parts.shift();
  return parts.join('.');
}

function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return `${time} ${label}s`;
}

export function timeAgo(time) {
  const between = (Date.now() - Number(time)) / 1000;
  if (between < 3600) {
    return pluralize(Math.floor(between / 60), 'minute');
  } else if (between < 86400) {
    return pluralize(Math.floor(between / 3600), 'hour');
  }
  return pluralize(Math.floor(between / 86400), 'day');
}
