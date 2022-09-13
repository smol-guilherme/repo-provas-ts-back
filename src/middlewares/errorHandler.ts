import { Request, Response, NextFunction } from "express";

export function handleError(error, req: Request, res: Response, next: NextFunction) {
    console.log(error);
    
    if(isJoiError(error)) {
        if(error?.details[0]?.type === 'string.pattern.base') return res.status(422).send();
        if(error?.details[0]?.type === 'any.only') return res.status(422).send();
        if(error?.details[0]?.type === 'string.empty') return res.status(422).send();
    }
    if(error.type === 'not_found_error') return res.status(404).send();
    if(error.type === 'no_schema_error') return res.status(400).send();
    if(error.type === 'already_exists_error') return res.status(409).send();
    if(error.type === 'ownership_not_match_error') return res.status(401).send();
    
    res.status(500).send();
}

function isJoiError(error) {
    if(Object.keys(error).includes('details')) return true;
    return false;
}