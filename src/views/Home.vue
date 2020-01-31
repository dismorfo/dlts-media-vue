<template>
  <div class="main container">
    <div class="overflow-auto">
      <br />
      <h4>{{ title }}</h4>
      <hr />
      <h6>Filter</h6>
      <b-form-group label-cols-sm="0" label-align-sm="left" label-for="filterInput" class="mb-0">
        <b-input-group size="sm">
          <b-form-input
            v-model="filter"
            type="search"
            id="filterInput"
            placeholder="Type to Filter"
          >
          </b-form-input>
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
      <b-form-group
        label-cols-sm="0"
        label-align-sm="left"
        label-size="sm"
        description="Leave all unchecked to filter on all data"
        class="mb-0"
      >
        <b-form-checkbox-group v-model="filterOn" class="mt-1">
          <b-form-checkbox value="id">Resource</b-form-checkbox>
          <b-form-checkbox value="type">Type</b-form-checkbox>
          <b-form-checkbox value="collection">Collection</b-form-checkbox>
          <b-form-checkbox value="partner">Partner</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <br />
      <b-table
        striped
        hover
        caption-top
        sort-icon-left
        :sort-by.sync="sortBy"
        :busy.sync="isBusy"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filterIncludedFields="filterOn"
        :filter="filter"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
      >
        <template v-slot:table-busy>
          <div class="text-center my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>{{ loadingMessage }}</strong>
          </div>
        </template>
        <template v-slot:cell(id)="data">
          <router-link :to="data.item.source">{{ data.item.label }}</router-link>
        </template>
        <template v-slot:cell(actions)="row">
          <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
            view
          </b-button>
        </template>
      </b-table>
      <b-pagination
        align="center"
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        aria-controls="items"
      ></b-pagination>
    </div>
    <b-modal
      :id="infoModal.id"
      :title="`Metadata for item '${infoModal.item.id}'`"
      size="lg"
      ok-only
      @hide="resetInfoModal"
    >
      <h5>Label</h5>
      <p>{{ infoModal.label }}</p>
      <hr />
      <h5>Type</h5>
      <p class="capitalize">{{ infoModal.item.type }}</p>
      <hr />
      <h5>Handle</h5>
      <p>{{ infoModal.item.handle }}</p>
      <hr />
      <h5>Collection</h5>
      <p>
        <strong>Name</strong>: {{ infoModal.item.collection.name }}
        <br />
        <strong>Code</strong>: {{ infoModal.item.collection.code }}
      </p>
      <hr />
      <h5>Partner</h5>
      <p>
        <strong>Name</strong>: {{ infoModal.item.partner.name }}
        <br />
        <strong>Code</strong>: {{ infoModal.item.partner.code }}
      </p>
      <hr />
      <h5>Manifests</h5>
      <ul>
        <li v-for="manifest in infoModal.item.manifests" v-bind:key="manifest">
          {{ manifest }}
        </li>
      </ul>
      <hr />
      <h5>Embeded player</h5>
      <div v-bind:class="{ audio: infoModal.item.type === 'audio' }">
        <p>iframe source: {{ `${origin}${infoModal.embedPlayer}` }}</p>
        <b-embed
          class="border"
          type="iframe"
          aspect="16by9"
          :src="infoModal.embedPlayer"
          allowfullscreen
        >
        </b-embed>
      </div>
      <hr />
      <h5>JSON response</h5>
      <b-form-textarea v-model="infoModal.code" rows="10"></b-form-textarea>
    </b-modal>
  </div>
</template>

<style lang="scss">
@import '../sass/style.scss';
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

const baseUrl: string = process.env.BASE_URL;

interface Item {
  id: string;
  type: string;
  handle: string;
  collection: any;
  partner: any;
  manifests: any;
}

interface Resource {
  collection: string;
  id: string;
  label: string;
  identifier: string;
  source: string;
  partner: string;
  type: string;
}

interface Field {
  key: string;
  label: string;
  sortable: boolean;
}

interface InfoModal {
  id: string;
  label: string;
  item: Item;
  code: string;
  embedPlayer: string;
}

@Component({
  components: {},
})
export default class Home extends Vue {
  title: string = 'List of resources';

  loadingMessage: string = 'Loading resources...';

  endpoint: string = `${process.env.BASE_URL}/resources.json`;

  totalRows: number = 0;

  currentPage: number = 1;

  rows: number = 0;

  origin: string = window.origin;

  perPage: number = 15;

  isBusy: boolean = true;

  items: Array<Resource> = [];

  filter: string | null = null;

  filterOn: Array<string> = [];

  sortDirection: string = 'asc';

  sortBy: string = 'collection';

  infoModal: InfoModal = {
    id: 'info-modal',
    label: 'Item metadata',
    embedPlayer: '',
    code: '',
    item: {
      id: '',
      type: '',
      handle: '',
      collection: {},
      partner: {},
      manifests: [],
    },
  };

  fields: Array<Field> = [
    {
      key: 'id',
      label: 'Resource',
      sortable: false,
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
    },
    {
      key: 'collection',
      label: 'Collection',
      sortable: true,
    },
    {
      key: 'partner',
      label: 'Partner',
      sortable: true,
    },
    {
      key: 'actions',
      label: 'Details',
      sortable: false,
    },
  ];

  private mounted(): void {
    this.fetchResource();
  }

  private info(item: Resource, index: number, button: any) {
    fetch(
      `${process.env.BASE_URL}/resources/${item.partner}/${item.collection}/${item.identifier}.json`,
    )
      .then((response: Response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((response: any) => {
        this.infoModal.embedPlayer = `${baseUrl}/#/player/${item.partner}/${item.collection}/${item.identifier}`;
        this.infoModal.code = JSON.stringify(response, null, 2);
        this.infoModal.label = response.label;
        this.infoModal.item.id = response.id;
        this.infoModal.item.type = response.type;
        this.infoModal.item.partner = response.partner;
        this.infoModal.item.collection = response.collection;
        this.infoModal.item.handle = response.handle;
        this.infoModal.item.manifests = response.manifests;
      })
      .finally(() => {
        this.$root.$emit('bv::show::modal', this.infoModal.id, button);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(`Error! Could not reach the API. ${error}`);
      });
  }

  private onFiltered(filteredItems: any) {
    // Trigger pagination to update the number of buttons/pages due to filtering
    this.totalRows = filteredItems.length;
    this.currentPage = 1;
  }

  private resetInfoModal() {
    this.infoModal.code = '';
    this.infoModal.item = {
      id: '',
      type: '',
      collection: {},
      partner: {},
      handle: '',
      manifests: [],
    };
  }

  private fetchResource(): void {
    this.isBusy = true;
    this.items = [];
    fetch(this.endpoint)
      .then((response: Response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((response: any) => {
        response.data.map((resource: Resource) => {
          resource.source = `/player/${resource.partner}/${resource.collection}/${resource.identifier}`;
          return this.items.push(resource);
        });
        this.totalRows = response.data.length;
      })
      .finally(() => {
        this.isBusy = false;
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(`Error! Could not reach the API. ${error}`);
      });
  }
}
</script>
