import { get } from 'lodash';

export const convertData = (data = []) => {
  return data.map((e) => {
    return convertDataMap(e);
  });
};

export const convertDataMap = (data) => {
  const id = get(data, 'id');
  const sender = get(data, 'sender');
  const receiver = get(data, 'user');
  const createdAt = get(data, 'createdAt');
  const deleted = get(data, 'deleted');
  const isRead = get(data, 'details.isRead');

  const template = get(data, 'template');
  const topic = get(template, 'topic');
  const description = get(template, 'description');
  const content = get(template, 'content');
  const type = get(template, 'type');

  return {
    id,
    sender,
    receiver,
    createdAt,
    isRead,
    deleted,
    topic,
    description,
    content,
    type
  };
};
