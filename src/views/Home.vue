<template>
  <div class="main container">
    <div class="overflow-auto">
      <h4>{{ title }}</h4>
      <br />
      <b-table striped hover :busy.sync="isBusy" :items="items" :fields="fields" caption-top>
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
        :total-rows="rows"
        :per-page="limit"
        aria-controls="items"
        @input="fetchResource"
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

const { log } = console;

@Component({
  components: {},
})
export default class Home extends Vue {

  title: string = 'List of resources';

  loadingMessage: string = 'Loading resources...';

  limit: number = 50;

  endpoint: string = './resource.json';
  
  currentPage: number = 1;

  rows: number = 0;

  isBusy: boolean = true;

  items: Array<any> = [];

  fields: Array<Field> = [
    {
      key: 'id',
      label: 'Title',
    },
    {
      key: 'identifier',
      label: 'Identifier',
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
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((response) => {
        response.data.map((resource: Resource) => {
          const { identifier } = resource;
          resource.source = `/player/${identifier}`;
          return this.items.push(resource);
        });
      })
      .finally(() => {
        this.isBusy = false;
      })
      .catch((error) => {
        log(`Error! Could not reach the API. ${error}`);
      });
  }
}
</script>
