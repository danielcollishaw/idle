import { useResourceStore } from "../scripts/Resources";

export const buyDog = (amount: number) => {
  const state = useResourceStore.getState();

  const cost = state.dogCost + state.dogCost * state.getCompoundDogCost(amount - 1);

  if (state.barks < cost) {
    amount = getMaxDogAmount();
  }

  if (amount <= 0) {
    return `<div>Can't afford any</div>`;
  }

  state.buyDogs(amount);
  return `<div>Bought ${amount} dogs</div>`
}

const getMaxDogAmount = () => {
  //todo
  return 0;
}
