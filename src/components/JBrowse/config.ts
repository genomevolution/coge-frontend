const config = {
  assemblies: [
    {
      name: 'Ppersica',
      sequence: {
        type: 'ReferenceSequenceTrack',
        trackId: 'Ppersica-ReferenceSequenceTrack',
        adapter: {
          type: 'BgzipFastaAdapter',
          fastaLocation: { uri: '/Ppersica_298_v2.0.fa.bgz' },
          faiLocation: { uri: '/Ppersica_298_v2.0.fa.bgz.fai' },
          gziLocation: { uri: '/Ppersica_298_v2.0.fa.bgz.gzi' },
        },
      },
    },
  ],
  tracks: [
    // Tracks can be added here in the future
  ],
  configuration: {
    theme: {
      palette: {
        primary: {
          main: '#13522a', // dark_green
          light: '#8dc53e', // lt_green
          dark: '#009344', // med_green
        },
        secondary: {
          main: '#8dc53e', // lt_green
        },
        background: {
          default: '#ffffff',
          paper: '#f8f9fa',
        },
        text: {
          primary: '#13522a', // dark_green
          secondary: '#009344', // med_green
        },
        divider: '#e9ecef', // lt_gray
      },
    },
  },
  defaultSession: {
    name: 'Exploration session',
    margin: 0,
    views: [
      {
        id: 'linearGenomeView',
        minimized: false,
        type: 'LinearGenomeView',
        init: {
          loc: 'Pp01:1..1000', // región válida del genoma
          assembly: 'Ppersica',
          tracks: [],
        },
      },
    ],
  },
};

export default config;
