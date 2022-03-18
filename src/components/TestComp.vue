<template>
  <div>
    123
    <div>{{ aaa }}</div>
    
    <div class="slot-a">
    </div>
    <div>
      <slot></slot>
    </div>
    <div class="slot-b">
      <slot name="b"></slot>
    </div>
    <div class="slot-c">
      <slot name="c"></slot>
    </div>
    <div class="slot-d">
      <slot name="d"></slot>
    </div>
    <div class="slot-d">
      <slot name="d"></slot>
    </div>
    1231232
  </div>
</template>
<script>

export default {
    name: 'test-comp',
    components: {
    },
    props: {
        aaa: {
            type: String,
            default: '1'
        }
    },
    data() {
        return {
        };
    },
    methods: {
    }
};
</script>