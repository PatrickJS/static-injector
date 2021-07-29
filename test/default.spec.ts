import path from 'path';
import { createTestTransform } from './util/create-test-transform';
import { runTranspileScript } from './util/run-transpile-script';
describe('default', () => {
  it('hello-world', () => {
    createTestTransform(
      [path.resolve(__dirname, './fixture/hello.ts')],
      undefined,
      {
        writeFile: (fileName, data) => {
          expect(data).toContain(`MyClass.ɵfac`);
          expect(data).toContain(`MyClass.ɵprov`);
          let result = runTranspileScript(data);
          let hello = result.instance.hello();
          expect(hello).toBe('hello');
          expect(result.instance instanceof result.MyClass).toBe(true);
        },
      }
    );
  });
  it('parameters-decorator', () => {
    createTestTransform(
      [path.resolve(__dirname, './fixture/parameters-decorator.ts')],
      undefined,
      {
        writeFile: (fileName, data) => {
          let result = runTranspileScript(data);
          let out = result.instance.out();
          expect(out.token1).toBe(3);
          expect(out.noValue).toBe(null);
          expect(out.token1WithInjectorL2).toBe(2);
          expect(out.token1WithSelf).toBe(3);
        },
      }
    );
  });
  it('inject-class', () => {
    createTestTransform(
      [path.resolve(__dirname, './fixture/inject-class.ts')],
      undefined,
      {
        writeFile: (fileName, data) => {
          let result = runTranspileScript(data);
          let out = result.instance.out();
          expect(out.injectClass.name).toBe('InjectClass');
          expect(out.rootInjectClass.name).toBe('RootInjectClass');
        },
      }
    );
  });
  it('provider', () => {
    createTestTransform(
      [path.resolve(__dirname, './fixture/provider.ts')],
      undefined,
      {
        writeFile: (fileName, data) => {
          let result = runTranspileScript(data);
          let out = result.instance.out();
          expect(out.useClassClass.name).toBe('UseClassClass');
          expect(out.useExistingClass.name).toBe('inputValue');
          expect(out.useFactoryClass.name).toBe('inputValue');
        },
      }
    );
  });
  it('injectable', () => {
    createTestTransform(
      [path.resolve(__dirname, './fixture/injectable.ts')],
      undefined,
      {
        writeFile: (fileName, data) => {
          console.log(data);

          let result = runTranspileScript(data);
          let out = result.instance.out();
          expect(out.token).toBe(111);
        },
      }
    );
  });
});
