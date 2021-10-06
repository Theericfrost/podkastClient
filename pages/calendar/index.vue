<template>
  <div class="calendar">
    <div class="calendar__header">
      <v-container>
        <h1>Календарь</h1>
        <my-typer
          :text="'График выхода подкастов и знаменательные даты'"
          :eternal="true"
          :speed="150"
          :colorObj="[{ 'подкастов': 'crimson' }, { 'знаменательные': '#28BCE5' }]"
          :className="'main__typer'"
          :lines="2"
        />
      </v-container>
    </div>
    <div class="schedule">
      <v-container>
        <h3>График на август</h3>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="value"
            :type="type"
            :events="eventsComputed"
            :event-overlap-mode="mode"
            :event-overlap-threshold="30"
          ></v-calendar>
        </v-sheet>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { unix } from "moment";
import Typer from "~components/Typer/Typer";

export default {
  components: {
    "my-typer": Typer
  },
  data() {
    return {
      type: "month",
      mode: "column",
      value: "",
      events: []
    };
  },
  methods: {
    getColorByType(type) {
      switch (type) {
        case "podkast":
          return "red";
        default:
          return "green";
      }
    }
  },
  created() {
    axios.get(`${process.env.BACKEND}/calendar`).then(response => {
      if (response && response.data && response.data.data) {
        this.events = response.data.data;
      }
    });
  },
  computed: {
    eventsComputed() {
      return this.events.map(date => {
        const { end, start, name, type } = date;
        return {
          end: unix(end).format("YYYY-MM-DD"),
          start: unix(start).format("YYYY-MM-DD"),
          name,
          color: this.getColorByType(type),
          timed: false
        };
      });
    }
  }
};
</script>

<style lang="scss">
@import "./calendar.scss";
</style>
