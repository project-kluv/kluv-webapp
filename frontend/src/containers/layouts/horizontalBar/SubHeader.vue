<template>
  <div class="subheader shadow-sm">
    <div class="d-flex subheader-navbar">
      <vue-navigation-bar class :options="navbarOptions" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navbarOptions: {
        elementId: "main-navbar",
        isUsingVueRouter: true,
        mobileBreakpoint: 992,
        brandImagePath: "./",

        brandImageAltText: "brand-image",
        collapseButtonOpenColor: "#661c23",
        collapseButtonCloseColor: "#661c23",
        showBrandImageInMobilePopup: true,
        ariaLabelMainNav: "Main Navigation",
        tooltipAnimationType: "shift-away",
        menuOptionsLeft: [
          {
            type: "link",
            text: "Dashboard",
            iconLeft: '<i class="nav-icon mr-2 i-Bar-Chart"></i>',
            subMenuOptions: [
              {
                type: "link",
                text: "Version 1",
                path: { name: "dashboard.v1" },
                iconLeft: '<i class=" i-Right1"></i>',
              },

              {
                type: "link",
                text: "Version 2",
                path: { name: "dashboard.v2" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Version 3",
                path: { name: "dashboard.v3" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Version 4",
                path: { name: "dashboard.v4" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
            ],
          },
          {
            type: "link",
            text: "Ui Kits",
            iconLeft: '<i class="nav-icon mr-2 i-Suitcase"></i>',
            subMenuOptions: [
              {
                type: "link",
                text: "Alerts",
                path: { name: "alerts" },
                iconLeft: '<i class=" i-Right1"></i>',
              },

              {
                type: "link",
                text: "Accordion",
                path: { name: "accordion" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Badges",
                path: { name: "badges" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Buttons",
                path: { name: "buttons" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Bootstrap Tab",
                path: { name: "bootstrap-tab" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Buttons",
                path: { name: "buttons" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Accordion",
                path: { name: "accordion" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "List",
                path: { name: "list" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Pagination",
                path: { name: "pagination" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Popover",
                path: { name: "popover" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Progressbar",
                path: { name: "progressbar" },
                iconLeft: '<i class=" i-Right1"></i>',
              },

              {
                type: "link",
                text: "Modals",
                path: { name: "modals" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
            ],
          },
          {
            type: "link",
            text: "Datatables",
            iconLeft: '<i class="nav-icon mr-2 i-Computer-Secure"></i>',
            subMenuOptions: [
              {
                type: "link",
                text: "Paging",
                path: { name: "paging" },
                iconLeft: '<i class=" i-Right1"></i>',
              },

              {
                type: "link",
                text: "Filter",
                path: { name: "filter" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "List",
                path: { name: "list" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
              {
                type: "link",
                text: "Vue Good Tables",
                path: { name: "vue-good-table" },
                iconLeft: '<i class=" i-Right1"></i>',
              },
            ],
          },
        ],
        // menuOptionsRight: [
        //   {
        //     type: "button",
        //     text: "Signup",
        //     path: { name: "signup" },
        //     class: "button-red"
        //   },
        //   {
        //     type: "button",
        //     text: "Login",
        //     path: { name: "login" },
        //     iconRight: '<svg id="i-arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"> <path d="M22 6 L30 16 22 26 M30 16 L2 16" /> </svg>'
        //   }
        // ]
      },
    };
  },
};
</script>


<style lang="scss">
.subheader {
  .subheader-navbar {
    background-color: #fff;
  }
  position: fixed;
  top: 80px;
  z-index: 50;
  width: 100%;
  @media (max-width: 577px) {
    top: 70px;
  }
}

//  vue-navigation-bar plugins
.vnb {
  .tippy-box {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  }
  &__menu-options {
    &__option {
      &__link {
        &:focus {
          outline: none;
          border: 1px solid none;
        }
        &:hover {
          color: #a855f7;
          .vnb__menu-options__option__arrow {
            fill: #a855f7;
          }
        }

        &__icon {
          svg {
            fill: #a855f7 !important;
          }
        }
      }
    }
  }

  &__sub-menu-options {
    &__option {
      &__link {
        &:focus {
          outline: none;
          border: 1px solid none;
        }
        color: #000 !important;
        &:hover {
          color: #a855f7 !important;
          border-left: 2px solid #a855f7;
        }
      }
    }
  }
}

.vnb__popup {
  height: 80vh !important;
  overflow-x: hidden !important;
  overflow-y: scroll !important;
  .vnb__popup__top__close-button {
    &:focus {
      border: 1px solid none;
      outline: none;
    }
    top: 20px;
    right: -33px;
    svg {
      fill: #000 !important;
    }
  }
}
.vnb__collapse-button {
  margin-left: 33px;
  @media (max-width: 577px) {
    margin-left: 30px;
  }
}
</style>