<template>
  <div id="app">
    <h2>Program Example</h2>
    <day-program
      width="500"
      height="500">
      <show
        v-for="show in shows"
        v-bind="show"
        :key="`show-${show.id}`"/>
    </day-program>
  </div>
</template>

<script>
import DayProgram from '@/components/DayProgram';
import Show from '@/components/Show';

export default {
  name: 'App',
  components: {
    DayProgram,
    Show,
  },

  data() {
    return {
      shows: [
        { id: '1', spectacle: 'Batman Contre Robespierre', time: 32400, duration: 3600 },
        { id: '2', spectacle: 'Le Grenier à Pepe', time: 37800, duration: 2700 },
        { id: '3', spectacle: 'Nola Radio', time: 46800, duration: 3600 },
      ],
    };
  },
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}

#app {
  position: relative;
  height: 100vh;
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;
}
</style>
