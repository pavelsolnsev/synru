// инициализация и обновление карты

import useImage from './useImage';
import DG from '2gis-maps';

export function useMap(container, coords, { icon, zoom = 15 } = {}) {
  const getImage = useImage();
  let marker = ref(null);
  let map = ref(null);
  let mapIcon = ref(null);

  onMounted(() => {
    Promise.all([DG, resolveIcon(icon)])
      .then(function ([, url]) {
        map.value = DG.map(container.value, {
          center: coords,
          zoom: zoom,
          scrollWheelZoom: false,
        });
        mapIcon.value = DG.icon({
          iconUrl: url,
          iconSize: [36, 48],
        });

        marker.value = DG.marker(coords, { icon: mapIcon.value }).addTo(map.value);
      });
  });

  function setNewCoords(coords) {
    marker.value.removeFrom(map.value);
    marker.value = DG.marker(coords, { icon: mapIcon.value }).addTo(map.value);
    map.value.setView(coords);
  }

  return {
    marker,
    map,
    setNewCoords,
  };

  async function resolveIcon(url) {
    return getImage(url ?? '/assets/images/contacts/marker.svg');
  }
}
