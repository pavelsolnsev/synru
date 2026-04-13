<template>
  <div>
    <MSection>
      <h1>Atoms</h1>
    </MSection>

    <MSection
      title="AButton"
      nums="1"
    >
      <div class="simple-wrapper">
        <AButton>Full Default</AButton>
      </div>
      <div class="simple-wrapper">
        <AButton bg-color="red">Red</AButton>
      </div>
      <div class="simple-wrapper">
        <AButton bg-color="black">Black</AButton>
      </div>
      <div class="simple-wrapper">
        <AButton bg-color="white">White</AButton>
      </div>

      <hr>

      <div class="simple-wrapper">
        <AButton size="sm">sm</AButton>
      </div>
      <div class="simple-wrapper">
        <AButton size="md">Md</AButton>
      </div>
      <div class="simple-wrapper">
        <AButton size="lg">LG</AButton>
      </div>

      <hr>

      <AButton
        to="https://google.com"
        target="_blank"
      >
        Link to google
      </AButton>
    </MSection>

    <MSection
      title="AButtonSecond"
      nums="2"
    >
      <div class="simple-wrapper">
        <AButtonSecond>Full Default</AButtonSecond>
      </div>
      <div class="simple-wrapper">
        <AButtonSecond bg-color="grey">Grey</AButtonSecond>
      </div>
      <div class="simple-wrapper">
        <AButtonSecond bg-color="transparent">Transparent</AButtonSecond>
      </div>
    </MSection>

    <MSection
      title="AButtonThird"
      nums="3"
    >
      <div class="simple-wrapper">
        <AButtonThird>Full Default</AButtonThird>
      </div>

      <div class="simple-wrapper">
        <AButtonThird bg-color="light"> Light </AButtonThird>
      </div>

      <div class="simple-wrapper">
        <AButtonThird bg-color="light-white"> Light-white </AButtonThird>
      </div>

      <div class="simple-wrapper">
        <AButtonThird bg-color="dark"> Dark </AButtonThird>
      </div>

      <div class="simple-wrapper">
        <AButtonThird bg-color="red"> Red </AButtonThird>
      </div>

      <hr>

      <div class="simple-wrapper">
        <AButtonThird
          rounding="rect"
          bg-color="dark"
        >
          Rect
        </AButtonThird>
      </div>
      <div class="simple-wrapper">
        <AButtonThird
          rounding="circle"
          bg-color="dark"
        >
          Circle
        </AButtonThird>
      </div>

      <hr>

      <div class="simple-wrapper">
        <AButtonThird size="sm">Sm</AButtonThird>
      </div>
      <div class="simple-wrapper">
        <AButtonThird size="md">Md</AButtonThird>
      </div>
      <div class="simple-wrapper">
        <AButtonThird size="lg">LG</AButtonThird>
      </div>
    </MSection>

    <MSection
      title="AStandAloneSelect"
      nums="4"
    >
      <div
        class="simple-wrapper"
        style="width: 50%;"
      >
        <AStandAloneSelect
          placeholder="With Placeholder"
          :options="['One', 'Two', 'Three']"
        />
      </div>
      <div
        class="simple-wrapper"
        style="width: 50%;"
      >
        <AStandAloneSelect
          placeholder=""
          :options="['One', 'Two', 'Three']"
        />
      </div>
    </MSection>

    <MSection
      title="ASelect"
      nums="5"
    >
      <div
        class="simple-wrapper"
        style="width: 50%;"
      >
        <ASelect
          placeholder="With Placeholder"
          :options="['One', 'Two', 'Three']"
          name="select-1"
        />
      </div>
      <div
        class="simple-wrapper"
        style="width: 50%;"
      >
        <ASelect
          placeholder=""
          :options="['One', 'Two', 'Three']"
        />
      </div>
    </MSection>

    <MSection
      title="ATextarea"
      nums="6"
    >
      <div
        class="simple-wrapper"
        style="width: 50%;"
      >
        <ATextarea placeholder="My Default Textarea" />
      </div>
    </MSection>

    <MSection
      title="AInput"
      nums="7"
    >
      <div
        class="simple-wrapper"
        style="width: 50%;"
      >
        <AInput placeholder="My Default Input" />
      </div>
    </MSection>

    <MSection
      title="With Labels"
      nums="8"
    >
      <div
        class="simple-wrapper"
        style="width: 50%;"
      >
        <ALabel label="Input">
          <AInput placeholder="My Default Input With Label" />
        </ALabel>
      </div>
      <div />
      <div
        class="simple-wrapper"
        style="width: 50%;"
      >
        <ALabel label="Textarea">
          <ATextarea placeholder="My Default Textarea  With Label" />
        </ALabel>
      </div>
      <div />
      <div
        class="simple-wrapper"
        style="width: 50%;"
      >
        <ALabel label="Select">
          <ASelect
            placeholder="Select With Placeholder and Label"
            :options="['One', 'Two', 'Three']"
            name="select-1"
          />
        </ALabel>
      </div>
    </MSection>

    <MSection
      title="ACheckbox"
      nums="9"
    >
      <div
        class="simple-wrapper"
        style="width: 50%;"
      >
        <ACheckbox
          label="Я принимаю правила"
          value="false"
        />
      </div>
    </MSection>

    <MSection
      title="ANum"
      nums="10"
    >
      <div class="simple-wrapper">
        <ANum
          num="1"
          class="a-num--md"
        />
      </div>
      <div class="simple-wrapper">
        <ANum
          num="01"
          class="a-num--md"
        />
      </div>
      <div class="simple-wrapper">
        <ANum
          num="11"
          class="a-num--md"
        />
      </div>
    </MSection>

    <MSection
      title="ASvgMono"
      nums="11"
    >
      <div
        class="simple-wrapper"
        style="min-width: 50px; height: 50px; text-align: center;"
      >
        <ASvgMono name="play" />
      </div>
      <div
        class="simple-wrapper"
        style="min-width: 50px; height: 50px; text-align: center;"
      >
        <ASvgMono name="link" />
      </div>
      <div
        class="simple-wrapper"
        style="min-width: 50px; height: 50px; text-align: center;"
      >
        <ASvgMono name="finger-tap" />
      </div>
    </MSection>

    <MSection
      title="APlay"
      nums="12"
    >
      <APlay />
    </MSection>

    <MSection
      title="AMenuLink"
      nums="13"
    >
      <div
        class="simple-wrapper"
      >
        <AMenuLink
          active
          to="/"
        >
          Active
        </AMenuLink>
      </div>

      <div
        class="simple-wrapper"
      >
        <AMenuLink
          to="/"
        >
          Абитуриентам
        </AMenuLink>
      </div>

      <div
        class="simple-wrapper"
      >
        <AMenuLink
          to="/"
          text-color="red"
        >
          Приёмная комиссия 2024
        </AMenuLink>
      </div>
    </MSection>

    <MSection
      title="AAplyBtn"
      nums="14"
    >
      <div
        class="simple-wrapper"
      >
        <AApplyBtn title="Подобрать программу" />
      </div>
    </MSection>

    <MSection
      title="ALinkSocial"
      nums="15"
    >
      <div
        class="simple-wrapper"
      >
        <ALinkSocial to="t.me" />
      </div>

      <div
        class="simple-wrapper"
      >
        <ALinkSocial to="youtube.com" />
      </div>

      <div
        class="simple-wrapper"
      >
        <ALinkSocial to="vk.com" />
      </div>
    </MSection>

    <MSection
      title="ALogo"
      nums="16"
    >
      <div
        class="simple-wrapper"
      >
        <ALogo />
      </div>
    </MSection>

    <MSection
      title="APriemnayaKomissiya"
      nums="17"
    >
      <div
        class="simple-wrapper responsive-width"
        style="display: block"
      >
        <APriemnayaKomissiya />
      </div>
    </MSection>

    <MSection
      title="ATag"
      nums="18"
    >
      <div
        class="simple-wrapper"
      >
        <ATag
          text="Black"
          variant="black"
        />
      </div>

      <div
        class="simple-wrapper"
      >
        <ATag
          text="primary"
          variant="primary"
        />
      </div>

      <div
        class="simple-wrapper"
      >
        <ATag
          text="fill"
          variant="fill"
        />
      </div>
    </MSection>

    <MSection
      title="AUikitSelect"
      nums="19"
      style="overflow: visible"
    >
      <div
        class="simple-wrapper responsive-width"
        style="display: block"
      >
        <AUikitSelect
          :options="[
            { value: '1209', text: 'Колледж', popular: true },
            { value: '1729', text: 'Бакалавриат' },
            { value: '5531', text: 'Второе высшее' },
            { value: '5533', text: 'Магистратура' },
            { value: '9091', text: 'Аспирантура', popular: true },
            { value: '18259', text: 'Специалитет' },
            { value: '666', text: 'Специалитет', disabled:true },
          ]"
          placeholder="Уровень образования"
          other-option
        />
      </div>
    </MSection>
  </div>
</template>

<style lang="css" scoped>
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
</style>
