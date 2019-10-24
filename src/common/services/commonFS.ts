/* tslint:disable:max-classes-per-file  */
/* tslint:disable:member-ordering */
/*
 Copyright (C) 2018 3NSoft Inc.

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
import { SingleProc } from '@/common/libs/processes';
import { logError } from '@/common/libs/logging';

export abstract class StorageOnFS<T> {
    protected initializing: Promise<void> | undefined;
    protected fs!: T;

    protected constructor(
        fsPromise: Promise<T>,
    ) {
        this.initializing = fsPromise
            .then(fs => {
                this.fs = fs;
                this.initializing = undefined;
            });
    }
}

export interface ICommonFS<T> {
    save: (val: FileDataStructure<T>, path?: string) => Promise<void>;
    get: (path?: string) => Promise<FileDataStructure<T>>;
    delete: (path?: string) => Promise<void>;
    saveLink: (file: ReadonlyFile, path?: string) => Promise<void>;
    readLink: (fileName: string, path?: string) => Promise<SymLink>;
}

export class CommonFS<T> extends StorageOnFS<WritableVersionedFS> implements ICommonFS<T> {
    private valueToSave: FileDataStructure<T> | undefined;
    protected changeProc: SingleProc | undefined = new SingleProc();

    constructor(
        fsPromise: Promise<WritableVersionedFS>,
        private mainFilePath: string,
        private defaultValue: FileDataStructure<T>,
    ) {
        super(fsPromise);
    }

    public async save(val: FileDataStructure<T>, path?: string): Promise<void> {
        if (this.initializing) { await this.initializing; }
        if (!this.changeProc) {
            throw new Error(`Json from ${this.mainFilePath} is already closed.`);
        }

        this.valueToSave = val;
        return this.changeProc.startOrChain(async () => {
            if (this.valueToSave !== val) { return; }
            const fullPath = !path ?
                this.mainFilePath :
                `${this.mainFilePath}/${path}`;
            await this.fs.writeJSONFile(fullPath, val);
        })
            .catch(err => logError(`Error occurred when saving json to ${this.mainFilePath}`, err));
    }

    public async checkFilePresence(name: string): Promise<boolean> {
        if (this.initializing) { await this.initializing; }
        return await this.fs.checkFilePresence(`${this.mainFilePath}/${name}`);
    }

    public async get(path?: string): Promise<FileDataStructure<T>> {
        if (this.initializing) { await this.initializing; }
        const fullPath = !path ?
            this.mainFilePath :
            `${this.mainFilePath}/${path}`;
        return await this.fs.readJSONFile<FileDataStructure<T>>(fullPath)
            .catch((exc: FileException) => {
                if (exc.notFound) {
                    return this.defaultValue;
                } else {
                    throw exc;
                }
            });
    }

    public async delete(path?: string): Promise<void> {
        if (this.initializing) { await this.initializing; }
        const fullPath = !path ?
            this.mainFilePath :
            `${this.mainFilePath}/${path}`;
        return await this.fs.deleteFolder(fullPath, true)
            .catch((exc: FileException) => {
                logError(exc);
                throw exc;
            });
    }

    public async saveLink(file: ReadonlyFile, path?: string): Promise<void> {
        if (this.initializing) { await this.initializing; }
        const fullPath = !path ?
            this.mainFilePath :
            `${this.mainFilePath}/${path}`;
        return await this.fs.link(fullPath, file)
            .catch((exc: FileException) => {
                logError(exc);
                throw exc;
            });
    }

    public async readLink(fileName: string, path?: string): Promise<SymLink> {
        if (this.initializing) { await this.initializing; }
        const fullPath = !path ?
            `${this.mainFilePath}/${fileName}` :
            `${this.mainFilePath}/${path}/${fileName}`;
        return await this.fs.readLink(fullPath)
            .catch((exc: FileException) => {
                logError(exc);
                throw exc;
            });
    }

}
