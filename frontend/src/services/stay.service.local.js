import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';
// import { userService } from './user.service.js';
// const fs = require('fs');
const STORAGE_KEY = 'stay';

export const stayService = {
  query,
  getById,
  save,
  remove,
  getEmptyStay,
};

_loadDummyStays();

async function query() {
  const stays = await storageService.query(STORAGE_KEY);
  return stays;
}

async function getById(stayId) {
  const stay = await storageService.get(STORAGE_KEY, stayId);
  return stay;
}

async function save(stay) {
  if (stay._id) {
    return storageService.put(STORAGE_KEY, stay);
  } else {
    return storageService.post(STORAGE_KEY, stay);
  }
}

async function remove(stayId) {
  return storageService.remove(STORAGE_KEY, stayId);
}

function getEmptyStay() {
  return {
    _id: utilService.makeId(),
    name: '',
  };
}

// got error: const fs = require('fs');
function _loadDummyStays() {
  // const stays = JSON.parse(fs.readFileSync('/src/assets/DEMO_DATA.json'));
  // console.log('stays:', stays);
  console.log(
    "I cant read json file. Got error: Module not found: Error: Can't resolve fs"
  );
  console.log('in stay-service.local.js, line: 47');
}
