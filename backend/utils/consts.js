function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable : true,
    });
}

define("AUTH_NAME", {"DEFAULT": "KAS", "OLD":"KAS_OLD", "BATCH_JOB":"KAS_HS"});
define("CEX", {"UPBIT": "UPBIT", "BITHUMB":"BITHUMB", "COINONE":"COINONE"});
