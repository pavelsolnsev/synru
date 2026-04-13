<template>
  <div>
    <MSection
      title="MMap"
    >
      <div
        class="responsive-width-x2"
      >
        <MMap />
      </div>
    </MSection>
  </div>
</template>

<style lang="scss" scoped>
.simple-wrapper {
  display: inline-block;
  margin: 0 10px 10px 0;
}

hr {
  margin: 20px 0;
}

.responsive-width {
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }
  @media (min-width: 1200px) {
    width: 30%;
  }
}

.responsive-width-x2 {
  width: 100%;

  @media (min-width: 768px) {
    width: 75%;
  }
  @media (min-width: 1200px) {
    width: 60%;
  }
}

.s-fixed-bottom {
  position: fixed;
  z-index: 9000;
  overflow: hidden;
  width: 100%;
  left: 0;
  top: auto;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
}
</style>
