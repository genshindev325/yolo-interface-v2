#Icon Library

##way to use:

```js
import { IconLib } from 'components/Organisms/IconLib'
```

- use it as standalone component:

```js
<IconLib collection='brands' name='twitter' />
```

remember there are more props to control some behavior: dimension, direction, rotate

- as part of styled-component to style it:

```js
const TwitterIcon = styled(IconLib).attrs({ collection: 'brands', name: 'twitter' })\`
  fill: #ffffff;
  &:hover {
    fill: #004400;
  }
```

this will fill it in white and change to green on hover
