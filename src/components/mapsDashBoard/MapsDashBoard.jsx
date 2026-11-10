import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import MapsCss from "./mapsStyle.module.css";

// Corrección de íconos por defecto de Leaflet en React/Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    if (center) {
        map.setView(center, zoom);
    }
    return null;
};

const MapsDashBoard = ({ onIniciarTurno }) => {
    const sedes = [
        { id: 1, nombre: 'NEA Aeronáutica Civil', coords: [4.68944, -74.13333], radio: 200 },
        { id: 2, nombre: 'CEA Centro de Estudios Aeronáuticos', coords: [4.69070, -74.13397], radio: 200 },
        { id: 3, nombre: 'CNA Centro Nacional de Aeronavegación', coords: [4.69621, -74.13986], radio: 200 },
        { id: 4, nombre: 'CGAC Centro de Gestión Aeronáutico de Colombia', coords: [4.70660, -74.15317], radio: 200 }
    ];

    const [ubicacionUsuario, setUbicacionUsuario] = useState(null);
    const [distanciasSedes, setDistanciasSedes] = useState({});
    const [sedeCercanaId, setSedeCercanaId] = useState(null);
    
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [sedeSeleccionada, setSedeSeleccionada] = useState(null);

    const centroPorDefecto = [4.68944, -74.13333];

    const calcularDistancia = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    };

    useEffect(() => {
        if (!navigator.geolocation) return;

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const userCoords = [position.coords.latitude, position.coords.longitude];
                setUbicacionUsuario(userCoords);

                let nuevasDistancias = {};
                let sedeEnRangoId = null;

                sedes.forEach((sede) => {
                    const distancia = calcularDistancia(userCoords[0], userCoords[1], sede.coords[0], sede.coords[1]);
                    nuevasDistancias[sede.id] = Math.round(distancia);

                    if (distancia <= sede.radio) {
                        sedeEnRangoId = sede.id;
                    }
                });

                setDistanciasSedes(nuevasDistancias);
                setSedeCercanaId(sedeEnRangoId);
            },
            (error) => console.error("Error al obtener ubicación:", error),
            { enableHighAccuracy: true }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    const seleccionarSede = (sede) => {
        setSedeSeleccionada(sede);
        setMenuAbierto(false);
    };

    const estaEnRangoDeSedeSeleccionada = sedeSeleccionada && sedeCercanaId === sedeSeleccionada.id;
    const sedeActualObj = sedes.find(s => s.id === sedeCercanaId);

    return (
        <div className={MapsCss.containerFormMaps}>
            <div className={MapsCss.containerMenuDespegableMaps}>
                <button onClick={() => setMenuAbierto(!menuAbierto)}>
                    {sedeSeleccionada ? sedeSeleccionada.nombre : 'Seleccione Sede'} ▾
                </button>
                
                {menuAbierto && (
                    <ul className={MapsCss.menuDespegableMap}>
                        {sedes.map((sede) => (
                            <li 
                                key={sede.id} 
                                onClick={() => seleccionarSede(sede)}
                                style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #f1f3f5' }}
                                onMouseEnter={(e) => e.target.style.background = '#ffbf00'}
                                onMouseLeave={(e) => e.target.style.background = '#fff'}
                            >
                                {sede.nombre}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div style={{ marginBottom: '12px', padding: '10px', background: '#f1f3f5', borderRadius: '6px', fontSize: '14px', textAlign: 'center' }}>
                {ubicacionUsuario ? (
                    sedeActualObj ? (
                        <span style={{ color: '#198754', fontWeight: 'bold' }}>
                            🚀 ¡Te encuentras en el área de {sedeActualObj.nombre}!
                        </span>
                    ) : (
                        <span style={{ color: '#d97706', fontWeight: 'bold' }}>
                            ⚠️ Fuera del radio de cobertura de las sedes principales.
                        </span>
                    )
                ) : (
                    <span style={{ color: '#6c757d' }}>Obteniendo tu ubicación GPS actual...</span>
                )}
            </div>

            <div className={MapsCss.mapaForm}>
                <MapContainer 
                    center={sedeSeleccionada ? sedeSeleccionada.coords : centroPorDefecto} 
                    zoom={16} 
                    style={{ height: "100%", width: "100%", borderRadius: "8px" }}
                >
                    {sedeSeleccionada && <ChangeView center={sedeSeleccionada.coords} zoom={16} />}

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    {sedes.map((sede) => {
                        const enRango = distanciasSedes[sede.id] <= sede.radio;
                        return (
                            <React.Fragment key={sede.id}>
                                <Marker position={sede.coords}>
                                    <Popup>
                                        <strong>{sede.nombre}</strong><br />
                                        Radio: {sede.radio} metros
                                    </Popup>
                                </Marker>
                                <Circle 
                                    center={sede.coords} 
                                    radius={sede.radio} 
                                    pathOptions={{ 
                                        color: enRango ? '#198754' : '#0d6efd', 
                                        fillColor: enRango ? '#198754' : '#0d6efd', 
                                        fillOpacity: 0.25 
                                    }} 
                                />
                            </React.Fragment>
                        );
                    })}

                    {ubicacionUsuario && (
                        <>
                            <Marker position={ubicacionUsuario}>
                                <Popup>Tu ubicación actual en tiempo real</Popup>
                            </Marker>
                            <Circle 
                                center={ubicacionUsuario} 
                                radius={10} 
                                pathOptions={{ color: '#198754', fillColor: '#198754', fillOpacity: 0.6 }} 
                            />
                        </>
                    )}
                </MapContainer>
            </div>

            <div className={MapsCss.containerButtonMaps} style={{ marginTop: '15px', textAlign: 'center' }}>
                <button 
                    disabled={!estaEnRangoDeSedeSeleccionada}
                    onClick={() => {
                        if (onIniciarTurno) onIniciarTurno();
                    }}
                    style={{
                        padding: '10px 20px',
                        fontWeight: 'bold',
                        borderRadius: '6px',
                        cursor: estaEnRangoDeSedeSeleccionada ? 'pointer' : 'not-allowed',
                        backgroundColor: estaEnRangoDeSedeSeleccionada ? '#198754' : '#6c757d',
                        color: '#fff',
                        border: 'none',
                        opacity: estaEnRangoDeSedeSeleccionada ? 1 : 0.65
                    }}
                >
                    Iniciar Turno
                </button>
            </div>
        </div>
    );
};

export default MapsDashBoard;