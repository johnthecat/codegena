import * as generateUid from 'nanoid';

import {
    UpdateGroupItemParameters,
    UpdateGroupItemRequest,
    UpdateGroupItemResponse
} from '../../auto-generated/typings/index'

// TODO this mock should be replaced by auto mocks generation https://github.com/koshevy/codegena/issues/9

export const body: UpdateGroupItemRequest = {
    description: 'Sample group description in few words',
    isDone: false,
    title: 'Sample group item title'
};

export const wrongBody = {
    _description: 'Sample group description in few words',
    is_done: false,
    _position: 0,
    _title: 'Sample group item title'
};

export const parameters: UpdateGroupItemParameters = {
    groupId: generateUid(),
    itemId: generateUid(),
    forceSave: true
};

export const wrongParameters = {
    groupId: generateUid(),
    itemId: generateUid(),
    _forceSave: true
};

export const response: UpdateGroupItemResponse<200> = {
    ...body,
    dateCreated: (new Date()).toISOString(),
    dateChanged: (new Date()).toISOString(),
    position: 0,
    uid: generateUid()
};

export const wrongResponse = {
    ...wrongBody,
    date_created: (new Date()).toISOString(),
    date_changed: (new Date()).toISOString(),
    _position: 0,
    _uid: generateUid()
};

export const errorResponse: UpdateGroupItemResponse<500> = {
    description: 'Server error occurred',
    message: 'Error 500'
};

export const contentType = 'application/json';
export const wrongContentType = 'application/x-www-form-urlencoded';

export const expectedUrl = `/group/${parameters.groupId}/item/${parameters.itemId}?forceSave=true`;
export const expectedCode = 200;
export const expectedErrorCode = 500;
export const wrongCode = 301;
