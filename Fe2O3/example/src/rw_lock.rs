#[macro_use]
extern crate lazy_static;

use std::sync::RwLock;

#[derive(Debug, Clone, Copy)]
pub struct MyConfig {
    pub debug: bool,
    pub info: &'static str,
}

lazy_static! {
    pub static ref CONFIG: RwLock<MyConfig> = RwLock::new(MyConfig {
        debug: false,
        info: "Some info"
    });
}

impl MyConfig {
    pub fn init(custom_debug: Option<bool>, custom_info: Option<&'static str>) -> Result<(), i32> {
        let mut w = CONFIG.write().unwrap();

        match (custom_debug, custom_info) {
            (Some(debug), Some(info)) => {
                *w = MyConfig {
                    debug: debug,
                    info: info,
                }
            }
            _ => (),
        };

        Ok(())
    }

    pub fn global_config() -> MyConfig {
        let m = CONFIG.read().unwrap();
        // 返回配置的拷贝
        *m
    }
}
