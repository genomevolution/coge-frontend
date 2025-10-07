import React, { useState, useEffect } from 'react';
import { createViewState, JBrowseApp } from '@jbrowse/react-app2';
import '@fontsource/roboto';

import config from './config';

type ViewModel = ReturnType<typeof createViewState>;

interface JBrowseProps {
  genomeData?: {
    name: string;
    accessionId: string;
    speciesName?: string;
    fastaFile?: string;
    faiFile?: string;
    gziFile?: string;
    annotations?: Array<{
      name: string;
      filePath: string;
    }>;
  };
}

const JBrowse: React.FC<JBrowseProps> = ({ genomeData: initialGenomeData }) => {
  const [viewState, setViewState] = useState<ViewModel>();
  const [genomeData, setGenomeData] = useState(initialGenomeData);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data?.genomeData) {
        setGenomeData(event.data.genomeData);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    // Create annotation tracks
    const annotationTracks = genomeData?.annotations?.map((annotation, index) => ({
      type: 'FeatureTrack',
      trackId: `annotation-${index}`,
      name: annotation.name,
      assemblyNames: [genomeData?.name || 'Ppersica'],
      adapter: {
        type: 'Gff3Adapter',
        gffLocation: { uri: annotation.filePath },
      },
    })) || [];

    const dynamicConfig = {
      ...config,
      assemblies: [
        {
          name: genomeData?.name || 'Ppersica',
          sequence: {
            type: 'ReferenceSequenceTrack',
            trackId: `${genomeData?.name || 'Ppersica'}-ReferenceSequenceTrack`,
            adapter: {
              type: 'BgzipFastaAdapter',
              fastaLocation: { uri: genomeData?.fastaFile || '/Ppersica_298_v2.0.fa.bgz' },
              faiLocation: { uri: genomeData?.faiFile || '/Ppersica_298_v2.0.fa.bgz.fai' },
              gziLocation: { uri: genomeData?.gziFile || '/Ppersica_298_v2.0.fa.bgz.gzi' },
            },
          },
        },
      ],
      tracks: [
        ...annotationTracks,
      ],
      defaultSession: {
        ...config.defaultSession,
        views: [
          {
            id: 'linearGenomeView',
            minimized: false,
            type: 'LinearGenomeView',
          },
        ],
      },
    };

    const state = createViewState({
      config: dynamicConfig,
    });
    setViewState(state);
  }, [genomeData]);

  if (!viewState) {
    return <div>Loading JBrowse...</div>;
  }

  return (
    <div style={{ height: '100vh', width: '100vw', fontFamily: "'Asap', sans-serif" }}>
      <div style={{ 
        padding: '0.75rem 1rem', 
        backgroundColor: '#13522a', 
        color: 'white',
        fontSize: '1.25rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span>🧬 Genome Browser - {genomeData?.speciesName || genomeData?.name || 'Ppersica'}</span>
        <button
          onClick={() => window.close()}
          style={{
            background: 'transparent',
            border: '1px solid white',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          Close
        </button>
      </div>
      <div style={{ height: 'calc(100vh - 60px)' }}>
        <JBrowseApp viewState={viewState} />
      </div>
    </div>
  );
};

export default JBrowse;
