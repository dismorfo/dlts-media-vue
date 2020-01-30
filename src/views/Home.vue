<template>
  <div class="main container">
    <div class="overflow-auto">
      <h4>{{ title }}</h4>
      <br />
      <b-table
        striped
        hover
        :busy.sync="isBusy"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        caption-top
      >
        <template v-slot:table-busy>
          <div class="text-center my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>{{ loadingMessage }}</strong>
          </div>
        </template>
        <template v-slot:cell(id)="data">
          <router-link :to="data.item.source">{{ data.item.id }}</router-link>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface Resource {
  collection: string;
  id: string;
  identifier: string;
  source: string;
  partner: string;
  type: string;
}

interface Field {
  key: string;
  label: string;
}

@Component({
  components: {},
})
export default class Home extends Vue {
  title: string = 'List of resources';

  loadingMessage: string = 'Loading resources...';

  endpoint: string = `${process.env.BASE_URL}/resource.json`;

  totalRows: number = 0;

  currentPage: number = 1;

  rows: number = 0;

  perPage: number = 15;

  isBusy: boolean = true;

  items: Array<Resource> = [];

  filter: string | null = null;

  filterOn: Array<string> = [];

  sortDirection: string = 'asc';

  pageOptions: Array<number> = [5, 10, 15];

  fields: Array<Field> = [
    {
      key: 'id',
      label: 'Resource',
    },
    {
      key: 'type',
      label: 'Type',
    },
    {
      key: 'collection',
      label: 'Collection',
    },
    {
      key: 'partner',
      label: 'Partner',
    },
  ];

  private mounted(): void {
    this.fetchResource();
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
          const { identifier } = resource;
          resource.source = `/player/${identifier}`;
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
