export function getMergeLead() {
  if (!window?.sessionStorage) return '';

  const UNIX_TIMESTAMP = Math.round(new Date().getTime() / 1000);

  let savedMergeLead = window.sessionStorage.getItem('mergelead');

  if (!savedMergeLead) {
    savedMergeLead = generateId() + UNIX_TIMESTAMP;
    try {
      window.sessionStorage.setItem('mergelead', savedMergeLead);
    }
    catch (error) {
      console.error(error);
    }
  }

  return savedMergeLead;
}

export function getEntryPoint(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  const cookieName = 'entry_point';
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  const existingCookie = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));

  if (existingCookie) {
    return decodeURIComponent(existingCookie.split('=')[1]);
  }

  const entryPoint = window.location.toString();
  const expires = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000).toUTCString();
  document.cookie = `${cookieName}=${encodeURIComponent(entryPoint)}; expires=${expires}; path=/`;

  return entryPoint;
}

export function getMatomoUid() {
  if (typeof window._paq != 'object') return '';

  let matomoUid = '';

  window?._paq.push([ function(){
    //@ts-ignore
    matomoUid = this.getVisitorId();
  } ]);

  return matomoUid;
}

export function getPiwikId() {
  const PIWIK_COOKIE_NAME = '_pk_id';

  const results = document.cookie.match('(^|;) ?' + PIWIK_COOKIE_NAME + '([^=;]*)=([^;]*)(;|$)');

  if (!results) {
      return '';
  }

  return (decodeURIComponent(results[3]));
}

export function getAnalitycsId() {
  const GA_COOKIE_NAME = '_ga';

  const results = document.cookie.match('(^|;) ?' + GA_COOKIE_NAME + '=([^;]*)(;|$)');

  if (!results) {
      return '';
  }

  return (decodeURIComponent(results[2]));
}
