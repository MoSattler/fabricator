type InstructionValue<Value> = Value | ((...args: any) => Value);

type UnpackFunction<Value> = Value extends (...args: any) => infer R
  ? R
  : Value;

type Instructions<Model> = {
  [Property in keyof Model]: InstructionValue<Model[Property]>;
};

type InstructionsOverwrite<Model> = {
  [Property in keyof Model]?: InstructionValue<Model[Property]>;
};

type Model<Instructions> = {
  [Property in keyof Instructions]: UnpackFunction<Instructions[Property]>;
};

function isFunction<Value>(
  value: Value | InstructionValue<Value>
): value is (...args: any) => Value {
  return typeof value === "function";
}

function Fabricator<
  M extends Model<I>,
  I extends Instructions<M> = Instructions<M>
>(instructions: I) {
  const fabricate = (overwriteInstructions: InstructionsOverwrite<M> = {}) => {
    const instructionsWithOverwrite = {
      ...instructions,
      ...overwriteInstructions,
    };
    const object = Object.keys(instructionsWithOverwrite).reduce(
      (object, key) => {
        const value = instructionsWithOverwrite[key as keyof I];
        const newValue = isFunction(value) ? value() : value;
        // @ts-expect-error
        object[key as keyof M] = newValue;
        return object;
      },
      {} as M
    );

    return object;
  };

  fabricate.extend = <
    ExtendedM extends M & Model<ExtraI>,
    ExtraI extends Instructions<Omit<ExtendedM, keyof M>> = Instructions<
      Omit<ExtendedM, keyof M>
    >
  >(
    instructionExtension: ExtraI
  ) => Fabricator({ ...instructions, ...instructionExtension });

  return fabricate;
}

export { Fabricator };
