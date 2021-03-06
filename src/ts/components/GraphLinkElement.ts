import Vue, { ComponentOptions } from 'vue'
import * as d3 from 'd3';
import GraphLink from '../models/GraphLink'

export interface GraphLinkElement extends Vue {
  link: GraphLink;
}

export default {
  props: ['link'],
  data: function () {
    return {};
  },

  template: `
    <g>
      <text :x="textX" :y="textY">{{link.path}}</text>
      <line :marker-end="markerUrl"
        :x1="link.source.x"
        :y1="link.source.y"
        :x2="link.target.x"
        :y2="link.target.y"
        v-bind:class="{focused : link.focused}"
      />
      <circle v-if="link.isActive" class="atcive-location"
        r="4"
        :cx="activeX"
        :cy="activeY"
      />,
  </g>`,

  computed: {
    id: function (): string {
      const sourceId = this.link.source.id;
      const targetId = this.link.target.id;

      if (sourceId < targetId) {
        return sourceId + "-" + targetId;
      } else {
        return targetId + "-" + sourceId;
      }
    },

    textX: function (): number {
      return this.link.source.x + 0.6 * (this.link.target.x - this.link.source.x);
    },

    textY: function (): number {
      return this.link.source.y + 0.6 * (this.link.target.y - this.link.source.y);
    },

    activeX: function(): number {
      const source = this.link.source;
      const target = this.link.target;
      if (this.link.progress < 0) {
        return target.x + (source.x - target.x) * (this.link.progress / 100 * -1);
      } else {
        return source.x + (target.x - source.x) * (this.link.progress / 100);
      }
    },

    activeY: function(): number {
      const source = this.link.source;
      const target = this.link.target;
      if (this.link.progress < 0) {
        return target.y + (source.y - target.y) * (this.link.progress / 100 * -1);
      } else {
        return source.y + (target.y - source.y) * (this.link.progress / 100);
      }
    },

    markerUrl: function(): string {
      if (this.link.focused) {
        return "url(#arrow2)";
      } else {
        return "url(#arrow)";
      }
    }
  },
} as ComponentOptions<GraphLinkElement>