import capitalize from 'lodash/capitalize';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import DateInput from './DateInput.vue';
import Form from '../../constants/Form';
import TypeOverline from '../TypeOverline/TypeOverline.vue';
import '../../assets/tailwind.css';

export default {
  title: 'DateInput',
  component: DateInput,
};

const { Sizes, Variants } = Form;

export const Gallery = () => ({
  components: { DateInput, TypeOverline },
  data() {
    return {
      sizes: Sizes,
      variants: Variants,
    };
  },
  methods: {
    capitalize,
    handleInput(e) {
      console.log(e);
      action(e); // TODO(jon.jandoc): This is not working.
    },
  },
  template: `
    <div>
      <TypeOverline tag="h1" variant="large">Date Inputs</TypeOverline>
      <div class="flex flex-wrap -mx-8 -mt-8">
        <div
          v-for="variant in variants"
          :key="variant"
          :class="['w-56', (variant === 'ghost-inverted' ? 'm-4 p-4 bg-gray-0 text-white' : 'm-8')]"
        >
          <TypeOverline tag="h2" class="mb-2">{{ variant }}</TypeOverline>
          <div v-for= "size in sizes" :key="'regular-' + variant + '-' + size" class="mb-2">
            <TypeOverline tag="h2" class="mb-2">Empty</TypeOverline>
            <DateInput
              :variant="variant"
              :size="size"
              @input="handleInput"
            />
            <TypeOverline tag="h2" class="mb-2">Filled</TypeOverline>
            <DateInput
              :variant="variant"
              :size="size"
              value="07/07/2007"
              @input="handleInput"
            />
            <TypeOverline tag="h2" class="mb-2">Invalid</TypeOverline>
            <DateInput
              :variant="variant"
              :size="size"
              invalid
              @input="handleInput"
            />            
            <TypeOverline tag="h2" class="mb-2">Disabled</TypeOverline>
            <DateInput
              :variant="variant"
              :size="size"
              disabled
              @input="handleInput"
            />
            <TypeOverline tag="h2" class="mb-2">Disabled, Filled</TypeOverline>
            <DateInput
              :variant="variant"
              :size="size"
              disabled
              value="07/07/2007"
              @input="handleInput"
            />
          </div>
        </div>
      </div>
    </div>
  `,
});

export const WithKnobs = () => {
  return {
    components: { DateInput },
    props: {
      variant: {
        default: select('Variant', Object.values(Variants), Variants.STANDARD),
      },
      size: {
        default: select('Size', Object.values(Sizes), Sizes.NORMAL),
      },
      label: {
        default: text('Label', 'First name'),
      },
      placeholder: {
        default: text('Placeholder', 'Joe Smith'),
      },
      error: {
        default: text('Error', 'Something went wrong'),
      },
      invalid: {
        default: boolean('Invalid', false),
      },
    },
    template: `
      <div class="p-8" :class="variant === 'ghost-inverted' && 'bg-gray-0'">
        <DateInput
          :label="label"
          :variant="variant"
          :size="size"
          :error="error"
          :invalid="invalid"
        />
      </div>
    `,
  };
};
