/*
 Copyright (C) 2019 3NSoft Inc.

 This program is free software: you can redistribute it and/or modify it under
 the terms of the GNU General Public License as published by the Free Software
 Foundation, either version 3 of the License, or (at your option) any later
 version.

 This program is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along with
 this program. If not, see <http://www.gnu.org/licenses/>.
*/
const ALL_LANGUAGES: SetupMenuItemValue[] = [
  { section: 'language', code: 'en', name: 'English', isSelected: false },
];

const ALL_THEMES: SetupMenuItemValue[] = [
  { section: 'theme', code: 'default', name: 'Light (Default)', isSelected: false },
  { section: 'theme', code: 'dark', name: 'Dark', isSelected: false },
];

export const APP_SETUP_MENU: SetupMenuItem[] = [
  {
    id: 1,
    section: 'language',
    text: 'Languages',
    icon: 'language',
    isSelected: false,
    value: ALL_LANGUAGES,
  },
  {
    id: 2,
    section: 'theme',
    text: 'Color Themes',
    icon: 'brush',
    isSelected: false,
    value: ALL_THEMES,
  },
];
