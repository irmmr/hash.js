import { getHashQuery, getHashValue, getQuery, getUrlHash } from "../helpers.js";
import HashTrigger from "./trigger.js";

/**
 * Export each event name to
 * use for identify events.
 */
export const EVENTS = [
    'set',
    'set.value',
    'set.query',
    'change',
    'change.value',
    'change.query',
    'clear',
    'clear.value',
    'clear.query',
];

/**
 * Dispatch checker for hashchange event
 * in window that manages other events.
 * @param {event} the window event 
 */
export function changeDispatch(e) {
    // collect hash from uri and use trigger
    const tri     = HashTrigger;
    const to      = getUrlHash(e.newURL || '');
    const from    = getUrlHash(e.oldURL || '');

    // parse and get each value and query params
    const fromValue = getHashValue(from);
    const fromQuery = getHashQuery(from);
    const toValue   = getHashValue(to);
    const toQuery   = getHashQuery(to);

    // change status
    const changed      = to !== from;
    const valueChanged = toValue !== fromValue;
    const queryChanged = toQuery !== fromQuery;

    /*
     * Change events + Set events
     * main => when hash changed
     * value => when hash value changed
     * query => when hash query changed
     */

    // change [main]
    if (changed) {
        tri.run('set', { value: to });
        tri.run('change', { from, to });
    }

    // change [value]
    if (valueChanged) {
        tri.run('set.value', { value: toValue });
        tri.run('change.value', { from: fromValue, to: toValue });
    }

    // change [query]
    if (queryChanged) {
        tri.run('set.query', {
            value: getQuery(toQuery),
            valueStr: toQuery
        });
        tri.run('change.query', {
            from: getQuery(fromQuery),
            to: getQuery(toQuery),
            str: {
                from: fromQuery,
                to: toQuery
            }
        });
    }

    /*
     * Clear events
     * main => when all page hash cleared
     * value => when hash value cleared
     * query => when hash query cleared
     */

    // clear [main]
    if (from !== '' && to == '') {
        tri.run('clear', { from });
    }

    // clear [value]
    if (fromValue !== '' && toValue == '') {
        tri.run('clear.value', { from: fromValue });
    }

    // clear [query]
    if (fromQuery !== '' && toQuery == '') {
        tri.run('clear.query', { from: getQuery(fromQuery), fromStr: fromQuery });
    }
}