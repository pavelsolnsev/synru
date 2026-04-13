import ALabel from './ALabel.vue';
import ASelect from '../ASelect/ASelect.vue';
import AInput from '../AInput/AInput.vue';
import ATextarea from '../ATextarea/ATextarea.vue';

export default {
  title: 'Atoms/ALabel',
  component: ALabel,
  argTypes: {},
};

const SelectWithLabelTemplate = (args) => ({
  components: { ALabel, ASelect },
  setup() {
    const selectOptions = ['first option', 'second option', 'third option'];
    return { args, selectOptions };
  },
  template:
    '<a-label v-bind="args"><ASelect :options="selectOptions"/></a-label>',
});

const InputWithLabelTemplate = (args) => ({
  components: { ALabel, AInput },
  setup() {
    return { args };
  },
  template:
    `<a-label v-bind="args">
      <AInput placeholder="input placeholder"/>
    </a-label>`,
});

const TextareaWithLabelTemplate = (args) => ({
  components: { ALabel, ATextarea },
  setup() {
    return { args };
  },
  template:
    `<a-label v-bind="args">
      <ATextarea placeholder="textarea placeholder" />
    </a-label>`,
});

export const SelectWithLabel = SelectWithLabelTemplate.bind({});
SelectWithLabel.args = { label: 'Label for Select' };

export const InputWithLabel = InputWithLabelTemplate.bind({});
InputWithLabel.args = { label: 'Label for Input' };

export const TextareaWithLabel = TextareaWithLabelTemplate.bind({});
TextareaWithLabel.args = { label: 'Label for Textarea' };
