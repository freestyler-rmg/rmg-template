RMG-Template v2.2b
==================================================

## SASS Directories Structure

scss/
|-- base/
|
|-- helper/
|
|-- project/
|   |-- elements/
|   |   |-- \_button.scss
|   |   ...
|   |   
|   |-- layouts/
|   |   |-- \_main-footer.scss
|   |   |-- \_main-navigation.scss
|   |   
|   |-- pages/
|       |-- 
|
|-- temp/
|
|-- vendor/
|
|-- \_base.scss
|
|-- \_helper.scss
|
|-- \_project.scss
|
|-- \_temp.scss
|
|-- \_vendor.scss
|
|-- \_main.scss

---

## Included

jQuery and fallback

reset.css

Micro clearfix

---

## To-dos

gulp-rename (use it with bower)

gulp-util

gulp-filesize (use it with gulp build)

gulp-babel

HTML5Boilerplate

gulp-uncss

gulp-plumber

gulp-bower (config .bowerrc)

core, config

---

### Notes

input[type=number] {
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button { -webkit-appearance: none;}
  &::-webkit-outer-spin-button { -webkit-appearance: none;}
}


h1, h2, h3, h4, h5, h6 {

}

h1 {  }
h2 {  }
h3 {  }
h4 {  }
h5 {  }
h6 {  }

p {  }

strong { font-weight: bold; }

em { font-style: italic; }

ul, ol {
  li {

  }
}

ul {
  & > li {
    ul {
      li {

      }
    }
  }
}

ol {
  & > li {
    ol {
      li {

      }
    }
  }
}

table {
  tr {
    th {

    }

    td {

    }
  }
}

blockquote {

}

dt {
  font-weight: bold;
  text-decoration: underline;
}
dd {
  margin: 0;
  padding: 0 0 0.5em 0;
}

---

## Directories Explanation

*base/*

default customization (including reset, clearfix)

*helper/*

variables, functions, mixin, typography, color, etc.

*project/*

elements  -> repeatable... elements (use .e- class naming)

layouts   -> repeatable... layouts (main header, footer, navigation, etc)

pages     -> for... pages (use .p- class naming)

plugins   -> plugins customization (use .js- class naming)

*temp/*

temporary folder for colaboration trouble or other what not

*vendor/*

plugins and frameworks and what not from other area of internet


## License
MIT license: http://www.opensource.org/licenses/mit-license.php
