<script setup lang="ts">
import { ogeSubjects } from './SEduMinScoreData';
</script>

<template>
  <div class="s-discipline-content a-font_l">
    <template
      v-for="(subject) in ogeSubjects"
      :key="subject.title"
    >
      <p>
        <span
          style="font-weight: bold;"
          v-html="subject.title"
        />
      </p>
      <table
        style="width: 800px;"
        border="1"
        cellspacing="1"
        cellpadding="1"
      >
        <tbody>
          <tr>
            <td><span style="font-weight: bold;">Оценка</span></td>
            <td><span style="font-weight: bold;">Баллы</span></td>
          </tr>
          <tr
            v-for="(row) in subject.rows"
            :key="row[0]"
          >
            <td>{{ row[0] }}</td>
            <td>{{ row[1] }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>
