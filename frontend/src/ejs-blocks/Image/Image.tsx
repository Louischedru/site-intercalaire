import { createRoot } from 'react-dom/client';
import Component from './Component';
import * as articleImageCalls from '../../api-calls/ArticleImage';

class BlockId {
  static id = 0;
  static getBlockId() {
    this.id++;
    return this.id;
  }
}

export default class Image {
  container: HTMLDivElement;
  blockId: number;
  id: number;

  constructor({ data }: { data: { id?: number } }) {
    this.container = document.createElement('div');
    this.blockId = BlockId.getBlockId();
    this.id = data.id || -1;
    console.log('BLOCK CREATED', this.id);
  }

  static get toolbox() {
    return {
      title: 'Image',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
    };
  }

  render() {
    const updateId = (id: number) => {
      this.id = id;
    };

    const root = createRoot(this.container);
    root.render(
      <Component id={this.id} updateId={updateId} blockId={this.blockId} />,
    );
    return this.container;
  }

  save(blockContent: HTMLElement) {
    console.log(blockContent);
    return { id: this.id };
  }

  async removed() {
    if (this.id < 0) return;
    try {
      const response = await articleImageCalls.deleteOne(this.id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}
