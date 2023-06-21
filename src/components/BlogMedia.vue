<script setup></script>

<template>
      <section class="media-blog">
            <div class="container">
                  <h3>Homey Goat Blog</h3>
                  <p>Check out our social media!</p>
                  <div class="blog__social-media">
                        <a href="#" class="blog__icon fb-icon" title="HomeyGoat Facebook">
                              <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                              >
                                    <path
                                          fill="white"
                                          d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z"
                                    />
                              </svg>
                        </a>
                        <a href="#" class="blog__icon insta-icon" title="HomeyGoat Instagram">
                              <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 15 15"
                              >
                                    <path
                                          fill="none"
                                          stroke="white"
                                          d="M11 3.5h1M4.5.5h6a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4v-6a4 4 0 0 1 4-4Zm3 10a3 3 0 1 1 0-6a3 3 0 0 1 0 6Z"
                                    />
                              </svg>
                        </a>
                  </div>
            </div>
      </section>
</template>

<style lang="scss" scoped>
.media-blog {
      .container {
            position: sticky;
            top: 4rem;

            display: grid;
            gap: 2rem;
            padding: 1.5rem;
            border-radius: 7px;
            box-shadow: $box-shadow-10;

            border: $bw-1 solid $bc-grayopacity-05;

            h3 {
                  border-bottom: $bw-1 solid $bc-grayopacity-05;
            }
      }
}

.blog__icon {
      display: inline-flex;
      padding: 0.4em;
      border-radius: 50%;
      cursor: pointer;
      transition: $transition-04;
      background-color: $color-gray;

      &:hover,
      &:focus {
            outline: none;
      }

      & > svg {
            width: clamp(15px, 0.5rem + 2vw, 24px);
            height: clamp(15px, 0.5rem + 2vw, 24px);
      }
}

.fb-icon {
      margin-right: 1rem;
      background-color: hsl(214, 89%, 52%);
}

.insta-icon {
      background-image: $color-gray;
      position: relative;
      overflow: hidden;
      isolation: isolate;

      &::after {
            content: '';
            background-image: linear-gradient(
                  190deg,
                  #405de6,
                  #5b51d8,
                  #833ab4,
                  #c13584,
                  #e1306c,
                  #fd1d1d,
                  #f56040,
                  #f77737,
                  #fcaf45,
                  #ffdc80
            );

            position: absolute;
            inset: 0;
            z-index: -1;

            transition: $transition-04;
      }
}
</style>
