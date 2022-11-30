<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div id="navbarBasicExample" class="navbar-menu is-active">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">{{ $t("message.home") }}</router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> {{ $t("message.language") }} </a>
            <div class="navbar-dropdown">
              <a
                class="navbar-item"
                @click="
                  () => {
                    $i18n.locale = 'en';
                  }
                "
              >
                {{ $t("message.english") }}
              </a>
              <a
                class="navbar-item"
                @click="
                  () => {
                    $i18n.locale = 'es';
                  }
                "
              >
                {{ $t("message.spanish") }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
