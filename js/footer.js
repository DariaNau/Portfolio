const footerDiv = document.querySelector('.footer-text');
const year = new Date().getFullYear();
const footerText = `\u00A9${year} Daria Naumova`;
const footerTextArr = footerText.split('');

footerTextArr.forEach(char => {
  const node = document.createElement('span');
  node.classList.add('footer-char');
  node.innerText = char;
  footerDiv.appendChild(node);
});

const charSpanNodeArr = document.querySelectorAll('.footer-char');

const loopOptions = {
  shadowPx: 2,
  blurRadius: 4,
  shadowColorBottom: '#fff',
  shadowColorTop: '#fff',
  vShadowBottom: 0,
  vShadowTop: 0
};

const sparkleOptions = {
  charOffset: 2,
  speedIncrement: 25,
  timeBetweenDirectionChg: 100,
  timeBetweenSparkles: 4000
};

const loop = (charArr, forwardBoolean, addBoolean, speed, timeout) => {
  const arr = forwardBoolean ? charArr : [...charArr].reverse();
  const {
    shadowPx,
    blurRadius,
    shadowColorBottom,
    shadowColorTop
  } = loopOptions;

  let { vShadowBottom, vShadowTop } = loopOptions;

  const hShadow = forwardBoolean ? -shadowPx : shadowPx;
  const shadowIncrement = (shadowPx / arr.length) * 2;

  const styleArr = [];

  arr.forEach((char, i) => {
    const pastHalfway = i + 1 <= arr.length / 2 ? 1 : -1;

    // console.log(`
    // forwardBoolean: ${forwardBoolean}
    // addBoolean: ${addBoolean}
    // i: ${i}
    // pastHalfway: ${pastHalfway}
    // top: ${-hShadow} ${vShadowTop}
    // bottom: ${hShadow} ${vShadowBottom}

    // timeout: ${timeout}
    // `);

    const style = `text-shadow: ${-hShadow}px ${vShadowTop}px ${blurRadius}px ${shadowColorTop}, ${hShadow}px ${vShadowBottom}px ${blurRadius}px ${shadowColorBottom}`;
    styleArr.push(style);

    setTimeout(() => {
      addBoolean
        ? char.classList.add('sparkle')
        : char.classList.remove('sparkle');
      addBoolean
        ? char.setAttribute('style', `${styleArr[i]}`)
        : char.setAttribute('style', null);
    }, (timeout += speed));

    vShadowTop -= pastHalfway * shadowIncrement;
    vShadowBottom += pastHalfway * shadowIncrement;
  });
  return timeout;
};

const sparkle = charArr => {
  const { speedIncrement, timeBetweenDirectionChg } = sparkleOptions;
  let { charOffset, timeBetweenSparkles } = sparkleOptions;

  if (charOffset > charArr.length) charOffset = charArr.length;

  const minimumTimeBetweenSparkles =
    (charArr.length + charOffset) * speedIncrement * 2 +
    timeBetweenDirectionChg;

  if (timeBetweenSparkles < minimumTimeBetweenSparkles)
    timeBetweenSparkles = minimumTimeBetweenSparkles;

  let timeout = 0;

  timeout = loop(charArr, true, true, speedIncrement, timeout);
  timeout -= (charArr.length - charOffset) * speedIncrement;
  timeout = loop(charArr, true, false, speedIncrement, timeout);
  timeout += timeBetweenDirectionChg;
  timeout = loop(charArr, false, true, speedIncrement, timeout);
  timeout -= (charArr.length - charOffset) * speedIncrement;
  loop(charArr, false, false, speedIncrement, timeout);

  setTimeout(() => {
    sparkle(charArr);
  }, timeBetweenSparkles);
};

sparkle(charSpanNodeArr);