<template>
  <div id="page" class="page">
    <div role="main" id="main" class="pane main">
      <div role="presentation" id="display" :data-type="type" class="pane display">
        <div
          class="dlts_playlist flowplayer is-splash"
          :id="identifier"
          :style="{ backgroundImage: `url('${poster}')` }"
        ></div>
      </div>
    </div>
    <div
      v-if="isBusy"
      class="d-flex justify-content-center mb-3"
      style="margin-left: auto; margin-right: auto; position: absolute; top: 40%; left: 50%; z-index: 99999999999;"
    >
      <b-spinner
        type="grow"
        :label="`${$t('message.loadingPlayer')} ...`"
        style="width: 10rem; height: 10rem;"
      ></b-spinner>
    </div>
  </div>
</template>

<style lang="scss">
@import '../sass/style.scss';
</style>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import * as flowplayer from 'flowplayer';
import * as engine from 'flowplayer-hlsjs';
import * as plugin from 'flowplayer-audio';

engine(flowplayer);
plugin(flowplayer);

const playerKey: string = '$376358022683907';

const streamServer: string = 'https://stream.dlib.nyu.edu/hls-vod';

const fileServer: string = 'https://sites.dlib.nyu.edu/media/sites/default/files';

interface Manifest {
  type: string;
  src: string;
}

interface Clip {
  duration: number;
  seekable: boolean;
  time: number;
  src: string;
  sources: Manifest[];
}

export default Vue.extend({
  data() {
    return {
      endpoint: '../resources',
      title: '',
      identifier: '',
      type: '',
      share: false,
      isBusy: true,
      configuration: {
        key: playerKey,
        splash: true,
        playlist: Array(),
      },
      poster: '',
    };
  },
  mounted(): void {
    this.identifier = this.$route.params.identifier;
    this.$nextTick(() => {
      this.fetchData();
    });
  },
  methods: {
    getTypeFromUri(uri: string): string {
      const ext: string | undefined = uri.split('.').pop();
      switch (ext) {
        case 'm3u8':
          return 'application/x-mpegurl';
        default:
          throw `Stream ${ext} not supported.`;
      }
    },

    buildUri(uri: string): string {
      const regex: RegExp = /([a-zA-Z]+):\/\/(.+)/;
      const test: RegExpMatchArray | null = uri.match(regex);
      if (test && test.length === 3) {
        switch (test[1]) {
          case 'streamServer':
            return `${streamServer}/${test[2]}`;
          case 'fileServer':
            return `${fileServer}/${test[2]}`;
          default:
            throw `buildUri - Invalid URI - ${uri}`;
        }
      }
      throw `buildUri - Invalid URI - ${uri}`;
    },

    fetchData(): void {
      this.isBusy = true;
      fetch(`${this.endpoint}/${this.identifier}.json`)
        .then((response: Response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then((data: any) => {
          if (data.poster) {
            this.poster = this.buildUri(data.poster);
          }
          // current playback position in seconds
          const time: number = 0;
          // length of video in seconds
          const duration: number = 0;
          // whether the [server](index.html#server-side) supports
          // random jumping on timeline
          const seekable: boolean = true;
          // playlist array
          const playlist: Clip[] = [];
          // player object
          for (let item of data.manifests) {
            // path to currently playing video as given on setup
            const src: string = this.buildUri(item.manifest);
            // video format (media type)
            const type: string = this.getTypeFromUri(item.manifest);
            const source: Manifest = {
              type: type,
              src: src,
            };
            const clip: Clip = {
              duration: duration,
              seekable: seekable,
              time: time,
              src: src,
              sources: [source],
            };
            // add clip to playlist
            playlist.push(clip);
          }
          // add clip to playlist
          this.configuration.playlist = playlist;
          this.title = data.video.id;
          document.title = this.title;
          this.type = data.type;
          this.isBusy = false;
          this.initPlayer();
        });
    },

    initPlayer(): void {
      if (flowplayer) {
        flowplayer.conf = {
          share: this.share,
          // See https://jira.nyu.edu/jira/browse/DLTSVIDEO-120
          // See https://flowplayer.com/help/player/flowplayer-7/setup#splash
          // Splash contradicts autoplay and takes precendence if
          // you configure both.
          splash: this.configuration.splash,
          key: this.configuration.key,
        };

        // https://flowplayer.com/developers/player/flowplayer-7/playlists
        // https://flowplayer.com/help/player/flowplayer-7/api.html
        /* eslint-disable-next-line no-undef */
        const api = flowplayer(document.getElementById(this.identifier), this.configuration);

        api.on('finish', (e: Event, api: any): void => {
          // all players go to splash state on finish
          // https://demos.flowplayer.com/lookandfeel/splash-on-finish.html
          api.unload();
        });

        // When the video is fully loaded and video metadata (such as duration) becomes
        // available from the video object which is provided by the 3rd argument.
        api.on('ready', (e: Event, api: any, media: any): void => {
          // console.log('ready');
        });

        api.on('load', (e: Event, api: any, media: any): void => {
          // console.log('load');
        });

        api.on('beforeseek', (e: Event, api: any, media: any): void => {
          // console.log('beforeseek');
        });
      }
    },
  },
});
</script>