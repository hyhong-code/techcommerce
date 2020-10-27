import React from "react";
import Typewriter from "typewriter-effect";

const _Typewriter = ({ text }) => {
  return (
    <Typewriter
      options={{
        strings: text,
        autoStart: true,
        loop: true,
        delay: 60,
      }}
    />
  );
};

export default _Typewriter;
