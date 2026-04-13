import MFaculty from './MFaculty.vue';
import MFacultyMedicineImage from '~/assets/images/m_faculty/mediczina.svg?url';
import MFacultyMedicineImageSm from '~/assets/images/m_faculty/mediczina2.svg?url';
import MFacultyPsychologyImage from '~/assets/images/m_faculty/psixologiya.svg?url';
import MFacultyPsychologyImageSm from '~/assets/images/m_faculty/psixologiya2.svg?url';


export default {
  title: 'Molecules/MFaculty',
  component: MFaculty,
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    count: {
      control: { type: 'text' },
    },
    isNew: {
      control: { type: 'boolean' },
    },
  },
};

const Template = (args) => ({
  components: { MFaculty },
  setup() {
    return { args };
  },
  template: '<m-faculty v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Медицина',
  count: '15 специальностей',
  image: MFacultyMedicineImage,
  imageSm: MFacultyMedicineImageSm,
};

export const New = Template.bind({});
New.args = {
  title: 'Психология',
  count: '20 специальностей',
  image: MFacultyPsychologyImage,
  imageSm: MFacultyPsychologyImageSm,
  isNew: true,
};
