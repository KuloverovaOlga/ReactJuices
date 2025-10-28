import styles from './contacts.module.scss';

import 'leaflet/dist/leaflet.css';

import { PageAnim } from '../../components/AnimBlocks/AnimBlocks';

// import { useMap, useMapEvent, useMapEvents } from 'react-leaflet';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import logo from '../../assets/img/logo.png';

import mail from '../../assets/img/contacts_mail.svg';
import phone from '../../assets/img/contacts_phone.svg';
import place from '../../assets/img/contacts_place.svg';

function Contacts() {
  const markers = [
    {
      position: [55.757339, 37.659173],
      popupText: '123123'
    }
  ];

  const customIcon = new Icon({
    iconUrl: logo,
    iconSize: [100, 100] // размеры иконки
  });
  return (
    <PageAnim key="contacts" styles={`${styles.section}`}>
      <div className={`${styles.inner}  flex dc`}>
        <div className="container">
          <p className="tl1">Контакты</p>
        </div>
        <div className={`${styles.wrap}  relative`}>
          <div className="container">
            <div className={`${styles.info} flex ch dc  txt16 medium`}>
              <div className={`${styles.row} flex cv`}>
                <div className={`${styles.icon}`}>
                  <img src={phone} alt="" />
                </div>

                <div className={`${styles.text} flex dc`}>
                  <a href="telto:+7 (777) 777 77 77">+7 (777) 777 77 77</a>

                  <a href="telto:+7 (777) 777 77 77">+7 (777) 777 77 77</a>
                </div>
              </div>

              <div className={`${styles.row} flex cv`}>
                <div className={`${styles.icon}`}>
                  <img src={mail} alt="" />
                </div>

                <div className={`${styles.text} flex dc`}>
                  <a href="mailto:example@juices.com">example@juices.com</a>
                </div>
              </div>

              <div className={`${styles.row} flex cv`}>
                <div className={`${styles.icon}`}>
        
                  <img src={place} alt="" />
                </div>

                <div className={`${styles.text} flex dc`}>
                  <span>Москва, улица Земляной Вал, 33</span>
                </div>
              </div>
            </div>
          </div>

          <MapContainer center={[55.757339, 37.619173]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>, Tiles &copy; Thunderforest'
              url="https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=8ac991768cc245e48f4fe7ac4525046a"
            />
            {markers.map((marker) => (
              <Marker key={marker.position} position={marker.position} icon={customIcon}>
                <Popup>
                  <p className="tl1">{marker.popupText}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </PageAnim>
  );
}

export default Contacts;
