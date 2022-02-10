import {clientApi} from '../../helpers/axios';

export async function get_allNotifications() {
  return await clientApi.get('notifications/all', null, {
    headers: {},
  });
}

export async function mark_as_read(notification_id) {
  return await clientApi.get(
    `notifications/mark-as-read/${notification_id}`,
    null,
    {
      headers: {},
    },
  );
}
