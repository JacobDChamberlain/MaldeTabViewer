import React, { useEffect, useRef, useState } from 'react';
import { AlphaTabApi, Score, Track, Settings } from '@coderline/alphatab';
import { Tab } from '../../../../interfaces/tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGuitar } from '@fortawesome/free-solid-svg-icons';
import './AlphaTab.css';
import PlayerControls from './PlayerControls/PlayerControls';
import Guts_1 from '/FromManToMist/1_GUTS_tab.gp5';
import SDC_2 from '/FromManToMist/2_SUS_DIGO_BASS_tab.gp5';
import Mouthful_3 from '/FromManToMist/3_MOUTHFUL_tab.gp5';
import Hydraulic_4 from '/FromManToMist/4_HYDRAULIC_BASS_tab.gp5';
import Jukai_5 from '/FromManToMist/5_JUKAI_tab.gp5';
import Icon_6 from '/FromManToMist/6_ICON_OF_SIN_tab.gp5';
import Winter_7 from '/FromManToMist/7_WINTER_PALACE_tab.gp5';

const tabs = {
    FromManToMist: [Guts_1, SDC_2, Mouthful_3, Hydraulic_4, Jukai_5, Icon_6, Winter_7]
}


const AlphaTab: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const [api, setApi] = useState<AlphaTabApi | null>(null);
    const [tracks, setTracks] = useState<Track[]>([]);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [loading, setLoading] = useState(true);
    const [tabFilePath, setTabFilePath] = useState<string | null>(null);

    useEffect(() => {
        setTabFilePath(Mouthful_3);
    }, []);

    useEffect(() => {
        if (mainRef.current) {
            const alphaTabApi = new AlphaTabApi(mainRef.current, {
                core: {
                    file: tabFilePath,
                    fontDirectory: '/font/'
                },
                player: {
                    enablePlayer: true,
                    enableCursor: true,
                    enableUserInteraction: true,
                    soundFont: '/soundfont/sonivox.sf2'
                }
            } as Settings);
            setApi(alphaTabApi);

            alphaTabApi.renderStarted.on(() => {
                setLoading(true);
            });

            alphaTabApi.renderFinished.on(() => {
                setLoading(false);
            });

            alphaTabApi.scoreLoaded.on((score: Score) => {
                setTracks(score.tracks);
                setTitle(score.title);
                setArtist(score.artist);
            });

            return () => {
                alphaTabApi.destroy();
            };
        }
    }, [tabFilePath]);

    const handleTrackClick = (track: Track) => {
        if (api) {
            api.renderTracks([track]);
        }
    };

    function playPause() {
        api?.playPause();
    }

    const updateTabFilePath = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTabFilePath( e.target.value );
    };

    return (
        <div className="at-wrap" ref={wrapperRef}>
            {loading && (
                <div className="at-overlay">
                    <div className="at-overlay-content">
                        Loading Tabs...
                    </div>
                </div>
            )}
            {/* <div className='temp-controls'>
                <select className='song-select' value={tabFilePath || ''} onChange={updateTabFilePath}>
                    {user.tabs.map((tab: Tab) => (
                        <option key={tab.id} value={tab.fileURL}>{tab.name}</option>
                    ))}
                </select>
            </div> */}

            <div className="at-content">
                <div className="at-sidebar">
                    <div className="at-sidebar-content">
                        <div className="at-track-list">
                            {tracks.map(track => (
                                <div
                                    key={track.index}
                                    className="at-track"
                                    onClick={() => handleTrackClick(track)}
                                >
                                    <div className="at-track-icon">
                                        <FontAwesomeIcon icon={faGuitar} />
                                    </div>
                                    <div className="at-track-details">
                                        <div className="at-track-name">{track.name}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="at-viewport">
                    <div className="at-main" ref={mainRef}></div>
                </div>
            </div>
            {api && <PlayerControls title={title} artist={artist} playPause={playPause} api={api} />}
        </div>
    );
};

export default AlphaTab;