import { ChangeEvent } from 'react';
import { createRoot } from 'react-dom/client';

export default class Header {
  text: string;

  constructor({ data }: { data: { text: string } }) {
    this.text = data.text;
  }

  render() {
    const container = document.createElement('div');
    const root = createRoot(container);

    root.render(
      <input
        type="text"
        className="text-2xl font-black p-3 gobold w-full"
        placeholder="Titre..."
        value={this.text}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          this.text = e.currentTarget.value;
        }}
      />,
    );

    return container;
  }

  save() {
    return { text: this.text };
  }

  static get toolbox() {
    return {
      title: 'Titre',
      icon: '<b class="font-black">T</b>',
    };
  }
}
